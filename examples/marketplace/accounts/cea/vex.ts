import { Pricing } from "../../apps/vtex.pricing@1/app.vex.ts"
import { Logistics } from "../../apps/vtex.logistics@1/app.vex.ts"
import { Storefront } from "./storefronts/brasil.vex.ts"
import { VTEXAccount } from "../../apps/vtex.account@1/app.vex.ts"

const config = new CheckoutConfiguration({
    timeToCancel: 20
})

export default new VTEXAccount({
    checkout: Checkout,
    pricing: Pricing,
    logistics: Logistics,
    storefronts: [Storefront]
})