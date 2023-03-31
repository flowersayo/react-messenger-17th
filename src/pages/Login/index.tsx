import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '../SignUp/style';
import fetcher from '../../utils/fetcher';
import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useSWR from 'swr';

const LogIn = () => {
  var navigate = useNavigate();
  //const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      setLogInError(false);
      navigate('/workspace/sleact/channel/일반');
      alert('로그인 성공!');
    },
    [email, password],
  );
  /*
  console.log(error, userData);
  if (!error && userData) {
    console.log('로그인됨', userData);
    return <Navigate to="/workspace/sleact/channel/일반" />;
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
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <a href="/signup">회원가입 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default LogIn;