export var data = {
    id: "covid-assessment@1.0.0",
    nodes: {
        TERMS: {
            id: "TERMS_QUESTION",
            name: "BotInput",
            data: {
                label: "Accept Terms",
                properties: ["ENTRY_POINT"],
                header: [],
                status: "pending",
                body: [
                    "Hi there",
                    "Always consult a medical professional for serious symptoms or emergencies."
                ],
                actions: [
                    {
                        id: "TERMS_AGREE",
                        type: "ENUM_ACTION",
                        text: "Agree"
                    },
                    {
                        id: "TERMS_DISAGREE",
                        type: "ENUM_ACTION",
                        text: "I do not agree"
                    }
                ]
            },
            outputs: {
                TERMS_AGREE: {
                    connections: [{ node: "SOB", input: "act", data: {} }]
                },
                TERMS_DISAGREE: {
                    connections: [{ node: "EXIT", input: "act", data: {} }]
                }
            },
            inputs: { act: { connections: [] } },
            position: [500, 0]
        },
        SOB: {
            id: "SOB_QUESTION",
            name: "BotInput",
            data: {
                label: "Shortness of Breath",
                properties: [],
                header: [],
                status: "pending",
                body: [
                    "Have you had any difficulty breathing in the past 24 hours (such as needing to stop to catch your breath when walking across a room)?"
                ],
                actions: [
                    { id: "SOB_YES", type: "ENUM_ACTION", text: "Yes" },
                    { id: "SOB_NO", type: "ENUM_ACTION", text: "No" }
                ]
            },
            outputs: {
                SOB_YES: {
                    connections: [{ node: "HIGH_RISK", input: "act", data: {} }]
                },
                SOB_NO: {
                    connections: [{ node: "FEVER", input: "act", data: {} }]
                }
            },
            inputs: { act: { connections: [] } },
            position: [1150, 0]
        },
        FEVER: {
            id: "FEVER_QUESTION",
            name: "BotInput",
            data: {
                label: "Fever",
                properties: [],
                header: [],
                status: "pending",
                body: ["What would you like to do next?"],
                actions: [
                    {
                        id: "FEVER_CONTINUE",
                        type: "ENUM_ACTION",
                        text: "Continue"
                    },
                    {
                        id: "FEVER_EXIT",
                        type: "ENUM_ACTION",
                        text: "Exit"
                    }
                ]
            },
            outputs: {
                FEVER_CONTINUE: {
                    connections: [{ node: "HIGH_RISK", input: "act", data: {} }]
                },
                FEVER_EXIT: {
                    connections: [{ node: "EXIT", input: "act", data: {} }]
                }
            },
            inputs: { act: { connections: [] } },
            position: [1800, 0]
        },
        HIGH_RISK: {
            id: "HIGH_RISK_RESULT",
            name: "BotInput",
            data: {
                label: "High Risk",
                properties: [],
                header: [],
                status: "pending",
                body: [
                    "Ouch, it sounds like you may be at super high risk.",
                    "What you will do next, only you can know."
                ],
                actions: [
                    {
                        id: "HIGH_RISK_EXIT",
                        type: "PRIMARY_ACTION",
                        text: "Get Virtual Care Now"
                    }
                ]
            },
            outputs: {
                HIGH_RISK_EXIT: {
                    connections: [{ node: "EXIT", input: "act", data: {} }]
                }
            },
            inputs: { act: { connections: [] } },
            position: [2750, 0]
        },
        EXIT: {
            id: "EXIT_RESULT",
            name: "Exit",
            data: {
                label: "Exit",
                properties: [],
                header: [],
                status: "done",
                body: [],
                actions: []
            },
            outputs: {},
            inputs: { act: { connections: [] } },
            position: [3400, 0]
        }
    }
};
