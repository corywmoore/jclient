import { environment } from "../../../environments/environment";

export const JiraIssueRequestConfig = {
    authorization: "",
    project: "",
    domain: environment.JiraBaseUrl,
    itemTypes: "Story, Bug, Task",
    issueCategories: [{
        name: "In Development",
        criteria: [{
            subtaskName: "Development",
            statusName: "Done",
            relation: "!="
        }]
    }, {
        name: "Needs Code Review",
        criteria: [{
            subtaskName: "Server Development",
            statusName: "Done",
            relation: "=="
        }, {
            subtaskName: "Code Review",
            statusName: "Done",
            relation: "!="
        }]
    }, {
        name: "Can Promote To Test",
        criteria: [{
            subtaskName: "Code Review",
            statusName: "Done",
            relation: "=="
        }, {
            subtaskName: "Design Review",
            statusName: "Done",
            relation: "=="
        }, {
            subtaskName: "Promote to Test",
            statusName: "Done",
            relation: "!="
        }]
    }, {
        name: "Ready for Acceptance Testing",
        criteria: [{
            subtaskName: "Promote to Test",
            statusName: "Done",
            relation: "=="
        }, {
            subtaskName: "Acceptance Testing",
            statusName: "Done",
            relation: "!="
        }]
    }, {
        name: "Ready for Production",
        criteria: [{
            subtaskName: "Acceptance Testing",
            statusName: "Done",
            relation: "=="
        }, {
            subtaskName: "Published to Production",
            statusName: "Done",
            relation: "!="
        }]
    }]
};
