import { CustomErrorValidationMessage, ErrorValidationMessage } from "../interfaces";

export const formatErrorMessage = (
    errorValidationMessages: ErrorValidationMessage[]
): CustomErrorValidationMessage[] => {
    const errorData = errorValidationMessages.map((errorValidationMessage) => {
        const { path, message } = errorValidationMessage;

        return {
            error: `The key: ${path} , has an error: ${message}`,
        };
    });

    return errorData;
};
