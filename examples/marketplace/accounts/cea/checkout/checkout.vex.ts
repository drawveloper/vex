import { Checkout } from "../../../apps/vtex.checkout@1/app.vex.ts"

export const config = new Checkout({
    timeToCancel: 20
})