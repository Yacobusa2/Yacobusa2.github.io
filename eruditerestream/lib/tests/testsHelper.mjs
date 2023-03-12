import Database from "../database.mjs";

export default class TestsHelper {

    static async create({ title, questions, traits }) {
        try {
            // Add the traits to the system.
            const savedTraits = await Promise.all(traits.map(t => this.addTrait(t)));

            // Add the test.
            const test = await this.addTest(title);
            test.traits = savedTraits;
            
            // Add the questions with associated options.
            test.questions = await Promise.all(questions.map(async q => {
                const question = await this.addQuestion(test.id, q);
                const options = await Promise.all(q.options.map(o => 
                    this.addOption(test.id, question.id, o))
                );
                return {
                    question,
                    options
                };
            }));

            return test;
        } catch(e) {
            console.log('Error creating test or a part of the test.');
            console.error(e);
            return {
                error: e.detail ? e.detail : "An error occurred" 
            };
        }
    };

    static async updateTestTitle(id, title) {
        const query = {
            text: "UPDATE tests SET title = $2 WHERE id = $1",
            values: [id, title]
        };
        const result = await Database.connection.query(query);
        return result.rowCount >= 1;
    }

    static async save({ id, title, questions, traits }) {
        try {
            const test = { id, title, questions, traits };
            const result = { id };

            console.log('PATCHING', test);

            // Update title
            await this.updateTestTitle(id, title);

            // // Add the traits to the system.
            result.traits = await Promise.all(traits.map(t => 
                t.id ? this.updateTrait(t) : this.addTrait(t)
            ));
            
            // Add the questions with associated options.
            result.questions = await Promise.all(questions.map(async q => {
                const question = await (q.id ? this.updateQuestion(q) : this.addQuestion(test.id, q))
                const options = await Promise.all(q.options.map(o => 
                    o.id ?
                        this.updateOption(o)
                        :
                        this.addOption(test.id, q.id, o)
                ));
                return {
                    question,
                    options
                };
            }));

            console.log(result);

            return test;
        } catch(e) {
            console.log('Error saving test or a part of the test.');
            console.error(e);
            return null;
        }
    };

    static async addTest(title) {
        const query = {
            text: "INSERT INTO tests (title) VALUES ($1) RETURNING id",
            values: [title]
        };
        const result = await Database.connection.query(query);
        return result.rows?.[0] || null;
    };

    static async updateOption({ test_id, input, question_id, label, trait_code, effect_amount, id }) {
        const parsedEffectAmount = parseInt(effect_amount);
        const effectAmount = isNaN(parsedEffectAmount) ? 0 : parsedEffectAmount;
        const result = await Database.connection.query({
            text: "UPDATE options SET test_id = $1, input = $2, question_id = $3, label = $4, trait_code = $5, effect_amount = $6 WHERE id = $7 RETURNING *",
            values: [test_id, input, question_id, label, trait_code, effectAmount, id]
        });
        return result.rows?.[0] || null;
    }

    static async addOption(testID, questionID, option) {
        console.log('Adding option');
        console.log(option);

        const parsedEffectAmount = parseInt(option.effect_amount);
        const effectAmount = isNaN(parsedEffectAmount) ? 0 : parsedEffectAmount;
        const result = await Database.connection.query({
            text: "INSERT INTO options (test_id, input, question_id, label, trait_code, effect_amount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            values: [testID, option.input, questionID, option.label, option.trait_code, effectAmount]
        });
        console.log(result.rows?.[0]);
        return result.rows?.[0] || null;
    }

    static async addTrait(trait) {
        const { id, text, code, description } = trait;
        if (id) {
            trait.saved = true;
            return trait;
        }
        const result = await Database.connection.query({
            text: "INSERT INTO traits (text, code, description) VALUES ($1, $2, $3) RETURNING *",
            values: [text, code, description]
        });
        return result.rows?.[0] || null;
    }

    static async updateTrait(trait) {
        const { id, text, code, description } = trait;

        const result = await Database.connection.query({
            text: "UPDATE traits SET text = $1, code = $2, description = $3 WHERE id = $4 RETURNING *",
            values: [text, code, description, id]
        });
        return result.rows?.[0] || null;
    }

    static async updateQuestion(question) {
        const query = {
            text: "UPDATE questions SET text = $2 WHERE id = $1 RETURNING *",
            values: [question.id, question.text]
        };
        const result = await Database.connection.query(query);
        return result.rows?.[0] || null;
    }

    static async addQuestion(testID, question) {
        const query = {
            text: "INSERT INTO questions (test_id, text) VALUES ($1, $2) RETURNING id, text",
            values: [testID, question.text]
        };
        const result = await Database.connection.query(query);
        return result.rows?.[0] || null;
    }

    static async meta() {
        const query = { text: '' };
        const result = await Database.connection.query(query);
        return result;
    };
    
    static async deleteTrait(id) {
        const query = {
            text: "DELETE FROM traits WHERE id = $1",
            values: [id]
        };
        const result = await Database.connection.query(query);
        return result.rowCount >= 1;
    }

    static async delete(id) {
        const query = {
            text: "DELETE FROM tests WHERE id = $1",
            values: [id]
        };
        const result = await Database.connection.query(query);
        return result.rowCount >= 1;
    }

    static async getByID(id) {
        const testResult = await Database.connection.query({
            text: `SELECT * FROM tests WHERE id = $1`,
            values: [id]
        });
        const test = testResult.rows[0];

        if (!test) return null;

        test.questions = [];

        // Attach the used traits to the test for edit page.
        test.traits = (await Database.connection.query({
            text: `SELECT * FROM traits`,
            // values: [id]
        })).rows;

        const questionsResult = await Database.connection.query({
            text: `SELECT * FROM questions WHERE test_id = $1`,
            values: [id]
        });
        const questions = questionsResult.rows;
        test.questions = questions;

        const options = (await Database.connection.query({
            text: `SELECT * FROM options WHERE test_id = $1`,
            values: [id]
        })).rows;

        test.questions = test.questions.map(q => {
            // Add the options to each question.
            q.options = options.filter(o => o.question_id === q.id);
            console.log(q);

            return q;
        });

        return {
            ...test,
            questions,
            options
        };
    }

    // A shallow metadata version for presentation/lists of all tests?
    static async get() {
        const query = {
            text: "SELECT * FROM tests"
        };
        const result = await Database.connection.query(query);
        return result.rows;
    }

    static async getTraits() {
        const query = {
            text: "SELECT * FROM traits"
        };
        const result = await Database.connection.query(query);
        return result.rows;
    }

}