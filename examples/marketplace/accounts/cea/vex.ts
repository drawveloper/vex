import { Pricing } from "../../apps/vtex.pricing@1/app.vex.ts"
import { Logistics } from "../../apps/vtex.logistics@1/app.vex.ts"
import { Storefront } from "./storefronts/brasil.vex.ts"
import { config as checkout } from "./checkout/checkout.vex.ts"
import { VTEXAccount } from "../../apps/vtex.account@1/app.vex.ts"

export default new VTEXAccount({
    checkout,
    pricing: Pricing,
    logistics: Logistics,
    storefronts: [Storefront]
})