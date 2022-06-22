import React from 'react';
import { Text } from '@monite/react-kit';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
`;

type PageHeaderProps = {
  title: string;
  extra: React.ReactNode;
};
const PageHeader = ({ title, extra }: PageHeaderProps) => {
  return (
    <Wrapper>
      <div>
        <Text as="h1" textSize="h2">
          {title}
        </Text>
      </div>
      {extra ? <aside>{extra}</aside> : null}
    </Wrapper>
  );
};

export default PageHeader;
