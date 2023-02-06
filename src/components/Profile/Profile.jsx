import React, { useEffect, useContext } from 'react';

import {
  ProfileStyled,
  ProfileForm, 
  ProfileTitle, 
  ProfileFieldset,
  ProfileLabel,
  ProfileFieldError, 
  ProfileField,
  ProfileInput,
  ProfileBorder,
  ProfileButtonsContainer,
  ProfileButton
} from './styled';

import { Header } from '../Header';
import { CurrentUserContext } from '../contexts';
import { useForm } from '../../hooks';

export function Profile({ loggedIn, handleChangeProfile, handleSignOut }) {
  const user = useContext(CurrentUserContext);
  
  const { values, handleChange, resetForm, errors } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    handleChangeProfile(values);
  }

  useEffect(() => {
    if (user) {
      resetForm(user, {});
    }
  }, [user, resetForm]);
  
  const isNotValues = user.name === values.name && user.email === values.email;

  const isDisabled = errors.name || errors.email || isNotValues;

  const isInutErrorName = errors.name;
  const isInutErrorEmail = errors.email;
  
  return (
    <>
      <Header loggedIn={loggedIn} />
      <ProfileStyled> 
        <ProfileForm onSubmit={handleSubmit} noValidate>
          <ProfileTitle>Добро пожаловать, уважаемый {user.name}!</ProfileTitle>
          <ProfileFieldset>
            <ProfileLabel htmlFor="name">
              <ProfileFieldError nam={true}>{errors.name}</ProfileFieldError>
              <ProfileField>Имя</ProfileField>
              <ProfileInput
                err={isInutErrorName}            
                name="name"
                minLength='2'
                maxLength='30'
                type="text"
                required
                value={values.name || ''}
                onChange={handleChange}
              ></ProfileInput>
            </ProfileLabel>
            <ProfileBorder />
            <ProfileLabel htmlFor="email">
              <ProfileFieldError email={true}>{errors.email}</ProfileFieldError>
              <ProfileField>Космо почта</ProfileField>
              <ProfileInput
                err={isInutErrorEmail}
                name="email"
                type="email"
                required
                value={values.email || ''}
                onChange={handleChange}
              ></ProfileInput>
            </ProfileLabel>
            <ProfileButtonsContainer>
              <ProfileButton
                edit={true}  
                type="submit"
                disab={isDisabled}               
                disabled={isDisabled} 
                >
                  Изменить хроники
                </ProfileButton>
              <ProfileButton 
                type="button" 
                exit={true} 
                onClick={handleSignOut}
                >
                  Покинуть корабль
                </ProfileButton>
            </ProfileButtonsContainer>
          </ProfileFieldset>
        </ProfileForm>
      </ProfileStyled>
    </>
  );
};
