// Estrutura bruta retornada pela API do Life360
//Models - circles.ts
export interface Life360Circle {
    id: string;
    name: string;
    color: string;
    memberCount: string;
    createdAt: string;
}

export interface Life360CirclesResponse {
    circles: Life360Circle[];
}

// DTO limpo retornado pelo serviço
export interface CircleDTO {
    id: string;
    name: string;
    memberCount: string;
    createdAt: string;
}
