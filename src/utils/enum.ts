export enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
}

export enum StateProject {
    STATE_PROCESSING = 0,
    STATE_REJECT = 1,
    STATE_APPROVE = 2
}

export enum LabelStateProject {
    STATE_PROCESSING = "Chờ duyệt",
    STATE_REJECT = "Từ chối",
    STATE_APPROVE = "Chấp thuận"
}

export enum ColorStateProject {
    STATE_PROCESSING = "#108ee9",
    STATE_REJECT = "#f50",
    STATE_APPROVE = "#87d068"
}

export enum Pagination {
    PAGESIZE_MIN = 10,
}