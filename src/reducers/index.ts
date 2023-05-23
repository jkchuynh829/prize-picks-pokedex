import { combineReducers } from "@reduxjs/toolkit";
import { pokemon as pokemonReducer } from "./pokemon";

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
