import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';

import { ROUTER_PATH } from '../../constants';
import { Logo } from '../Logo';
import { useForm } from '../../hooks';
import sauron from '../../sound/sauron.mp3'

import {
  LoginStyled,
  LoginForm,
  LoginTitle,
  LoginFieldset,
  LoginLabel,
  LoginFieldError, 
  LoginField,
  LoginInput, 
  LoginLogo,
  LoginCheckbox,
  LoginLabelForCheckbox,
  LoginButtonContainer,
  LoginSubmitButton,
  LoginLinkText,
  LoginLink
 } from './styled';

export function Login({ onAuthorization, loggedIn, isInquiry }) {
  const navigation = useNavigate();

  const { values, handleChange, resetForm, errors } = useForm({});
  const [ checkboxActive, setCheckboxActive ] = useState(false);

  const [playShowPassword] = useSound(sauron, { volume: 0.25 });

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuthorization(values);
  };
  
  const handleShowPassword = () => {
    setCheckboxActive(!checkboxActive);
    if (!checkboxActive) {
      playShowPassword();
    }
  };

  useEffect(() => {
    resetForm();
  }, [resetForm, isInquiry]);

  const isErrors = errors.email || errors.password;
  const isEmptyValues = !values.password || !values.email;
  const isDisabled = (isErrors || isEmptyValues || isInquiry);

  return (
    <>
      {loggedIn
        ? navigation(ROUTER_PATH.MAIN)
        : <LoginStyled>
          <LoginForm onSubmit={handleSubmit} noValidate>
            <LoginLogo>
              <Logo />
            </LoginLogo>
            <LoginTitle>Скорее на борт!</LoginTitle>
            <LoginFieldset>
              <LoginLabel htmlFor="email">
                <LoginFieldError isError={errors.email}>
                  {errors.email}
                </LoginFieldError>
                <LoginField>Космо почта</LoginField>
                <LoginInput
                  onChange={handleChange}
                  isError={errors.email}
                  isDisa={isInquiry}
                  name="email"
                  placeholder="star@mail.ru"
                  type="email"
                  required
                  value={values.email || ""}
                  disabled={isInquiry}
                  autoComplete="email"
                ></LoginInput>
              </LoginLabel>
              <LoginLabel htmlFor="password">
                <LoginFieldError isError={errors.password}>
                  {errors.password}
                </LoginFieldError>
                <LoginField>Космо пароль</LoginField>
                <LoginInput
                  onChange={handleChange}
                  isError={errors.password}
                  isDisa={isInquiry}
                  name="password"
                  placeholder="Пароль"
                  minLength={6}
                  type={checkboxActive ? "text" : "password"}
                  required
                  value={values.password || ""}
                  disabled={isInquiry}
                  autoComplete="current-password"
                ></LoginInput>
                <LoginCheckbox
                  type="checkbox"
                  name="checkbox-log"
                  id="checkbox-log"
                  onChange={() => handleShowPassword()}
                  checked={checkboxActive}
                />
                <LoginLabelForCheckbox active={checkboxActive} htmlFor="checkbox-log" />
              </LoginLabel>
            </LoginFieldset>
            <LoginButtonContainer>
              <LoginSubmitButton
                type="submit"
                isBlock={isDisabled}
                disabled={isDisabled}
              >
                Отправляемся
              </LoginSubmitButton>
              <LoginLinkText>
                Ещё не зарегистрированы?
                <LoginLink
                  to={ROUTER_PATH.REGISTER}
                >
                  Регистрация
                </LoginLink>
              </LoginLinkText>
            </LoginButtonContainer>
          </LoginForm>
        </LoginStyled>
      }
    </>
  );
};
