import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const POKEMON_ENDPOINT = "https://pokeapi.co/api/v2/pokemon";
const SPECIES_ENDPOINT = "https://pokeapi.co/api/v2/pokemon-species";

const getEvolutionId = (url: string) => {
  const urlParts = url.split("/").filter((c: string) => !!c);
  const id = urlParts[urlParts.length - 1];
  return id;
};

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchData",
  async (pokemon: string) => {
    try {
      const result = await fetch(`${POKEMON_ENDPOINT}/${pokemon}`);
      const response = await result.json();
      return response;
    } catch (error) {
      throw new Error("Failed to fetch pokemon data");
    }
  }
);

export const fetchEvolution = createAsyncThunk(
  "pokemon/fetchEvolution",
  async (url: string) => {
    try {
      const result = await fetch(url);
      const response = await result.json();
      return response;
    } catch (error) {
      throw new Error("Failed to fetch pokemon evolution data");
    }
  }
);

export const fetchSpecies = createAsyncThunk(
  "pokemon/fetchSpecies",
  async (pokemon: string, { dispatch }) => {
    try {
      const result = await fetch(`${SPECIES_ENDPOINT}/${pokemon}`);
      const response: any = await result.json();

      dispatch(fetchEvolution(response.evolution_chain.url));

      return response;
    } catch (error) {
      throw new Error("Failed to fetch species data");
    }
  }
);

interface PokemonState {
  data: {
    [id: string]: Pokemon;
  };
  evolutions: {
    [id: string]: any;
  };
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  data: {},
  evolutions: {},
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.data[action.payload.name] = {
          ...state.data[action.payload.name],
          ...action.payload,
        };
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred.";
      })
      .addCase(fetchSpecies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.data[action.payload.name] = {
          ...state.data[action.payload.name],
          ...action.payload,
          evolution_chain: {
            ...action.payload.evolution_chain,
            id: getEvolutionId(action.payload.evolution_chain.url),
          },
        };
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSpecies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred.";
      })
      .addCase(fetchEvolution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvolution.fulfilled, (state, action) => {
        state.evolutions[action.payload.id] = {
          ...state.data[action.payload.id],
          ...action.payload,
        };
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEvolution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred.";
      });
  },
});

// export const {} = pokemonSlice.actions;
const { reducer: pokemon } = pokemonSlice;
export { pokemon };
