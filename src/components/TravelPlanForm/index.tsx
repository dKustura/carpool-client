import { Field, FieldProps, Form, Formik } from 'formik';
import React from 'react';
import Select from 'react-select';

// Components
import { FormHelperText, Grid, TextField, Typography } from '@material-ui/core';

// Validation
import { travelPlanSchema } from './validation/schema';
import { TravelPlanSchemaType } from './validation/types';

// Helpers
import { DEFAULT_FORM_VALUES } from './constants';
import { useStyles } from './styles';
import { Car, Employee, TravelPlan } from 'api';
import { validate } from './validation';

export interface Props {
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
              // validationSchema={travelPlanSchema}
              validate={(values) => validate(values, employees, travelPlans)}
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
                        <>
                          <Select
                            name={field.name}
                            onBlur={(e) => {
                              field.onBlur(e);
                              form.setFieldTouched(field.name);
                            }}
                            onChange={(option) =>
                              form.setFieldValue(field.name, option?.carId)
                            }
                            options={cars}
                            getOptionLabel={(car) => car.name}
                            getOptionValue={(car) => car.carId.toString()}
                          />
                          <FormHelperText error={!!error} variant="outlined">
                            {touched && error ? error : ' '}
                          </FormHelperText>
                        </>
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
