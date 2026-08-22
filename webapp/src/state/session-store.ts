import type { Member } from "../domain/member";

export type SessionState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "signed-in"; member: Member };

type Listener = (state: SessionState) => void;

class SessionStore {
  private state: SessionState = { status: "loading" };
  private readonly listeners = new Set<Listener>();

  getState(): SessionState {
    return this.state;
  }

  setState(state: SessionState): void {
    this.state = state;
    for (const listener of this.listeners) listener(state);
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }
}

export const sessionStore = new SessionStore();
