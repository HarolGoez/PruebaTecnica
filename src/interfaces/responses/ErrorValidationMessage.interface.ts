export interface ErrorValidationMessage {
    code: string;
    minimum?: number;
    type?: string;
    inclusive?: boolean;
    exact?: boolean;
    message: string;
    path: string[];
    expected?: string;
    received?: string;
}
