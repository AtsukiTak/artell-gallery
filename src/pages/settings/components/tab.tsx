import React, {FC} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

interface Props {
  selected: 'tab1' | 'tab2';
}

const Tab: FC<Props> = ({selected}) => {
  return (
    <Container>
      <TabItem selected={selected === 'tab1'} to="/settings/profile">
        プロフィール
      </TabItem>
      <TabItem selected={selected === 'tab2'} to="/settings/arts">
        作品
      </TabItem>
    </Container>
  );
};

export default Tab;

const TabItem: FC<{selected: boolean; to: string}> = ({
  selected,
  to,
  children,
}) => {
  if (selected) {
    return <SelectedTab to={to}>{children}</SelectedTab>;
  } else {
    return <UnselectedTab to={to}>{children}</UnselectedTab>;
  }
};

const Container = styled.div`
  width: 100%;
  height: 55px;
  background-color: #fafbfc;
  border-bottom: 1px solid #e1e4e8;
`;

const TabItemBase = styled(Link)`
  display: inline-block;
  width: 50%;
  height: 50px;
  margin-top: 5px;
  text-align: center;
  line-height: 50px;
  border-radius: 4px 4px 0px 0px;
`;

const SelectedTab = styled(TabItemBase)`
  background-color: white;
  border: 1px solid #e1e4e8;
  border-bottom-color: transparent;
  color: #24292e;
`;

const UnselectedTab = styled(TabItemBase)`
  color: #586069;
`;
