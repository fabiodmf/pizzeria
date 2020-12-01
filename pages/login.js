import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  Heading,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button
} from "@chakra-ui/react";

import AppContainer from "components/AppContainer";
import EmailInput from "components/EmailInput";
import PasswordInput from "components/PasswordInput";
import Link from "components/Link";
import { addToast } from "redux/actions";
import { postData } from "utils/";

function Login() {
  const dispatch = useDispatch();

  const data = useRef({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const setError = (key, error) => {
    setErrors({ ...errors, [key]: error });
  };

  const login = async (email, password) => {
    let toast;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/login`;

    postData(url, { email, password })
      .then(response => {
        console.log("DATA", url, response);

        if (response.status === 200) {
          toast = {
            status: "success",
            title: "Login successful.",
            description: response.data.message
          };
        } else {
          toast = {
            status: "error",
            title: "Login Failed.",
            description:
              response.data?.message || "Some error occurred. Try later!"
          };
        }
      })
      .catch(err => {
        console.log("ERR", url, err);

        toast = {
          status: "error",
          title: "Login Failed",
          description:
            err.response?.data ||
            err?.message ||
            "Some error occurred. Try later!"
        };
      })
      .finally(() => {
        if (toast) {
          dispatch(addToast(toast));
        }
      });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!data.current.email) {
      setError("email", "Email is required.");
    } else {
      if (!data.current.password) {
        setError("password", "Password is required.");
      } else {
        // there's email and password, so continue
        dispatch(
          addToast({
            status: "info",
            title: "Fetching Login...",
            description: "Request sent to the server."
          })
        );

        await login(data.current.email, data.current.password);

        return;
      }
    }

    dispatch(
      addToast({
        status: "error",
        title: "Invalid Data",
        description: "Please enter valid email & password."
      })
    );
  };

  return (
    <AppContainer height="full" py={8}>
      <Stack
        bg="white"
        width="full"
        maxWidth="400px"
        mx="auto"
        py={6}
        px={8}
        boxShadow="2"
      >
        <Heading as="h2" fontSize="2xl" textAlign="center" py={4}>
          Login
        </Heading>

        <Stack
          as="form"
          noValidate
          pt={6}
          spacing={6}
          justify="center"
          onSubmit={handleSubmit}
        >
          <FormControl isRequired isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <EmailInput
              type="email"
              id="email"
              placeholder="j.doe@example.com"
              onChange={value => {
                data.current.email = value;
                setError("email", "");
              }}
              onError={err => {
                setError("email", err);
              }}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <PasswordInput
              id="password"
              onChange={value => {
                if (value.trim() === "") {
                  setError("password", "Password is required.");
                } else {
                  data.current.password = value;
                  setError("password", "");
                }
              }}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <Link
            href="/login#"
            mb={1}
            colorScheme="blue"
            onClick={e => {
              e.preventDefault();

              dispatch(
                addToast({
                  status: "info",
                  title: "Missing",
                  description: "This feature is yet to be added. :("
                })
              );
            }}
          >
            Forgot Password ?
          </Link>

          <Button
            type="submit"
            colorScheme="primary"
            width="full"
            maxWidth="200px"
            alignSelf="center"
            mb={4}
          >
            Login
          </Button>
        </Stack>

        <Link href="/register" mt="0" color="blue.500">
          Do not have an account yet? Click to register.
        </Link>
      </Stack>
    </AppContainer>
  );
}

export default Login;
