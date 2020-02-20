import { observable } from "mobx";
import { createContext } from "react";

/* interface Users {
    [key: string]: Array<{
        id: string,
        injury: string,
        side: string,
        strength: string,
        date: Date
    }>
} */
interface Users {
    clientId: string,
    injury: string,
    side: string,
    strength: string,
    date: Date
}
class ClientStore {
    @observable newUser: {
        clientId: string,
        injury: string,
        side: string,
        strength: string,
        date: Date
    }
    @observable newClientId: string;
    @observable newInjury: string;
    @observable newSide: string;
    @observable newStrength: string;
    @observable newDate: Date;

    @observable clients: Users[] = [];
}

export const ClientStoreContext = createContext(new ClientStore());