import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';

const CreateModel = (props : any) => (
  <Create {...props}>
    <SimpleForm>
    <SimpleForm>
      <TextInput source="Nom" label="Name" />
      <TextInput source="Description" label="Description" multiline />
      <NumberInput source="PUHT" label="Price (HT)" />
      <TextInput source="Gamme" label="Range" />
    </SimpleForm>
    </SimpleForm>
  </Create>
);

export default CreateModel;