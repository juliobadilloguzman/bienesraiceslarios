export enum ModalType {
    confirmation = "confirmation",
    yesno = "yesno",
    info = "info"
}

export enum ModalResponse {
    success = "success",
    failed = "failed",
    warning = "warning"
}

export interface Modal {
    title: string;
    subtitle?: string;
    message: string;
    type: ModalType;
    response: ModalResponse;
    redirectTo?: string;
}
