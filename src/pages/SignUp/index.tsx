import useInput from '../../hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer, Success } from './style';
import fetcher from '../../utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useSWR from 'swr';

const SignUp = () => {
  //const { data: isLogin } = useSWR('/api/users', fetcher); // 주기적으로 로그인여부 확인
  // TODO 로그인 연동 구현하기
  const [signUpError, setSignUpError] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [mismatchError, setMismatchError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');

  const onChangePassword = useCallback(
    (e: any) => {
      setPassword(e.target.value);
      setMismatchError(passwordCheck !== e.target.value);
    },
    [passwordCheck, setPassword],
  );

  const onChangePasswordCheck = useCallback(
    (e: any) => {
      setPasswordCheck(e.target.value);
      setMismatchError(password !== e.target.value);
    },
    [password, setPasswordCheck],
  );

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!nickname || !nickname.trim()) {
        return;
      }
      if (!mismatchError) {
        setSignUpError(false);
        setSignUpSuccess(false);
        /*
        axios
          .post('/api/users', { email, nickname, password })
          .then(() => {
            setSignUpSuccess(true);
          })
          .catch((error) => {
            console.log(error.response?.data);
            setSignUpError(error.response?.data?.code === 403);
          });
          */
      }
    },
    [email, nickname, password, mismatchError],
  );
  /*
  if (isLogin) {
    // 서버로부터 받은 데이터가 확인이 되면 워크스페이스로 이동
    return <Navigate to="/workspace/sleact" />;
  }
  */

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>이미 가입된 이메일입니다.</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <a href="/login">로그인 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
