import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import dataProvider  from "./dataProvider";
import authProvider from "./authProvider";
import CreateModel from "./model/create.model";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource name="models" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} create={CreateModel} />
    <Resource name="users" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} create={CreateModel} />
    <Resource name="procedes" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} create={CreateModel} />
    <Resource name="ingredients" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} create={CreateModel} />
    <Resource name="roles" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} create={CreateModel} />
  </Admin>
);
