import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register, //vor komponenty register ani default valueneri mej vor jogenq datark en te lracrac voncor
    handleSubmit, //onClick-i jamanak mihat galisa ste nor gnum mnacacc funkcianery, vor stex stugi tena danninery chisht en te che
    setError, //esmeky chgitem
    formState: { errors, isValid }, //errornern a qashum
  } = useForm({
    defaultValues: {
      email: "email@email.ru", //default et dashteri mej incha exnelu lracrac(en dashtery voronq vor register en exel es anunneri tak)
      password: "atoaam",
    },
    mode: "onChange", //asuma vor en jamanaka validacyan anelu ete popoxutyun texi unena
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values)); //valuesy gnuma vorpes parametrer

    if (!data.payload) {
      alert("chstacvec avtorizovatca");
    }

    if ("token" in data.payload) {
      //ete datai payloady uni token
      window.localStorage.setItem("token", data.payload.token); //
    }
  };

  if (isAuth) {
    //asumenq ete registracya exac enq (beqica galis) uremn qci voch te logini ej ayl glavni ej
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "mayld gri" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          helperText={errors.password?.message}
          fullWidth
          {...register("password", { required: "parold gri" })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
