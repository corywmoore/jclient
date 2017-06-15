export class ResultsModel {
    project: string;
    issueSections: IssueSectionModel[];
}

export class IssueModel {
    expand: string;
    id: string;
    self: string;
    key: string;
    fields: FieldsModel;
}


export class FieldsModel {
    summary: string;
    issuetype: string;
    subtasks: SubtaskModel[];
    status: StatusModel;
    priority: PriorityModel;
}

export class StatusCategoryModel {
    self: string;
    id: number;
    key: string;
    colorName: string;
    name: string;
}

export class StatusModel {
    self: string;
    description: string;
    iconUrl: string;
    name: string;
    id: string;
    statusCategory: StatusCategoryModel;
}

export class PriorityModel {
    self: string;
    iconUrl: string;
    name: string;
    id: string;
}

export class SubtaskModel {
    id: string;
    key: string;
    self: string;
    fields: FieldsModel;
}

export class IssuetypeModel {
    self: string;
    id: string;
    description: string;
    iconUrl: string;
    name: string;
    subtask: boolean;
    avatarId: number;
}

export class IssueSectionModel {
    disabled: boolean;
    count: number;
    name: string;
    issues: IssueModel[];
}

export class ProjectModel {
    key: string;
    icon: string;
    name: string;
}
