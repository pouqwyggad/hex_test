export interface Filters {
    target: "asc_target" | "desc_target"
    short: "asc_short" | "desc_short"
    counter: "asc_counter" | "desc_counter"
}

export interface Table {
    id: number
    short: string
    target: string
    counter: string
}
