import { Static, Type } from "@sinclair/typebox";

// noinspection JSUnusedGlobalSymbols
export const TipResource = Type.Object({
  title: Type.String(),
});
export type TipResource = Static<typeof TipResource>;
