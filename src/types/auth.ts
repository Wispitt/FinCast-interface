

export interface AuthState {
    user: {
        uid: string;
        displayName: string | null;
        email: string | null;
        photURL: string | null;
    } | null;
    error: string | null;
    loading: boolean;
}