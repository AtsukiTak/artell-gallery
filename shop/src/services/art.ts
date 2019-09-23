import { Action as ReduxAction } from "redux";
import { ThunkAction } from "redux-thunk";
import * as firebase from 'firebase/app';

import { ArtistRepository, Art, ArtRepository } from "artell-models";

export interface State {
  list: Map<string, Art>;
}

export const InitialState = {
  list: new Map()
};

type AppAction<T extends string, Extra extends {} = {}> = ReduxAction<T> &
  { [K in keyof Extra]: Extra[K] };

export enum ActionType {
  clearArts = "CLEAR_ARTS",
  updateArts = "UPDATE_ARTS"
}

export type Action =
  | AppAction<ActionType.clearArts>
  | AppAction<ActionType.updateArts, { arts: Map<string, Art> }>;

const clearArts = (): Action => ({
  type: ActionType.clearArts
});

const updateArts = (arts: Map<string, Art>): Action => ({
  type: ActionType.updateArts,
  arts
});

export function queryArts(): ThunkAction<void, State, null, Action> {
  return async dispatch => {
    const artists = await new ArtistRepository(firebase.app()).queryList();
    const artRepo = new ArtRepository(firebase.app());
    const artistArts = await Promise.all(
      artists.map(artist => artRepo.queryListByArtist(artist))
    );
    const arts = new Map(
      artistArts.flat().map(art => [art.id, art] as [string, Art])
    );
    dispatch(updateArts(arts));
  };
}

export function reducer(state: State = InitialState, action: Action): State {
  switch (action.type) {
    case ActionType.clearArts:
      return {
        list: new Map()
      };
    case ActionType.updateArts:
      return {
        list: new Map(Array.from(state.list).concat(Array.from(action.arts)))
      };
    default:
      return state;
  }
}
