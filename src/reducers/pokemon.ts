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
      const response = await result.json();

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
        if (action.payload.name == null) return;
        state.data[action.payload.name] = {
          ...state.data[action.payload.name],
          id: action.payload.id,
          name: action.payload.name,
          abilities: action.payload.abilities?.map(
            (ability: any) => ability.ability.name ?? "ability"
          ),
          // Stretch goal: UX for list of learnable moves
          // moves: action.payload.moves,
          species: action.payload.species,
          imageUrl:
            action.payload.sprites["other"]["official-artwork"][
              "front_default"
            ],
          fallbackImageUrl: action.payload.sprites["front_default"],
          types: action.payload.types?.map(
            (type: any) => type.type.name ?? "type"
          ),
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
        if (action.payload.name == null) return;
        state.data[action.payload.name] = {
          ...state.data[action.payload.name],
          evolution_id: getEvolutionId(action.payload.evolution_chain.url),
          species: action.payload,
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
        if (action.payload.id == null) return;
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
