import { Field, FieldProps, Form, Formik } from 'formik';
import React from 'react';

// Components
import { Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Validation
import { TravelPlanSchemaType } from './validation/types';

// Helpers
import { DEFAULT_FORM_VALUES } from './constants';
import { useStyles } from './styles';
import { Car, Employee, TravelPlan } from 'api';
import { validate } from './validation';

interface Props {
  readonly cars: Car[];
  readonly employees: Employee[];
  readonly travelPlans: TravelPlan[];
}

const TravelPlanForm = ({ cars, employees, travelPlans }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.formContainer}>
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4">Create a Travel Plan</Typography>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12} sm={8}>
            <Formik
              initialValues={DEFAULT_FORM_VALUES}
              validate={(values) =>
                validate(values, cars, employees, travelPlans)
              }
              onSubmit={() => {
                return;
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field name="startLocation">
                      {({
                        field,
                        meta: { touched, error },
                      }: FieldProps<TravelPlanSchemaType>) => (
                        <TextField
                          {...field}
                          label="Start Location"
                          variant="outlined"
                          fullWidth
                          required
                          error={touched && !!error}
                          helperText={touched && error ? error : ' '}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="endLocation">
                      {({
                        field,
                        meta: { touched, error },
                      }: FieldProps<TravelPlanSchemaType>) => (
                        <TextField
                          {...field}
                          label="End Location"
                          variant="outlined"
                          fullWidth
                          required
                          error={touched && !!error}
                          helperText={touched && error ? error : ' '}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="carId">
                      {({
                        form,
                        field,
                        meta: { touched, error },
                      }: FieldProps<TravelPlanSchemaType>) => (
                        <Autocomplete
                          options={cars}
                          getOptionLabel={(option) => option.name}
                          onChange={(_, newValue) => {
                            form.setFieldValue(field.name, newValue?.carId);
                          }}
                          onBlur={(e) => {
                            field.onBlur(e);
                            form.setFieldTouched(field.name);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              label="Select Car"
                              variant="outlined"
                              error={touched && !!error}
                              helperText={touched && error ? error : ' '}
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="employeeIds">
                      {({
                        form,
                        field,
                        meta: { touched, error },
                      }: FieldProps<TravelPlanSchemaType>) => (
                        <Autocomplete
                          multiple
                          disableCloseOnSelect
                          options={employees}
                          getOptionLabel={(option) => option.name}
                          filterSelectedOptions
                          onChange={(_, newValue) => {
                            form.setFieldValue(
                              field.name,
                              newValue.map((value) => value.employeeId),
                            );
                          }}
                          onBlur={(e) => {
                            field.onBlur(e);
                            form.setFieldTouched(field.name);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Employees"
                              error={touched && !!error}
                              helperText={touched && error ? error : ' '}
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TravelPlanForm;
