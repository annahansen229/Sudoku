import React from "react"

import { Digit } from "@/types"

type NoteCellProps = {
    value: Digit
}

const NoteCell = ({value}: NoteCellProps) => {
    <div>{value}</div>
}

export default NoteCell