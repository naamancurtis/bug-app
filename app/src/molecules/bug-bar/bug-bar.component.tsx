import React, { FC } from 'react';
import {
  Wrapper,
  ID,
  StatusWrapper,
  Assigned,
  PriorityWrapper,
  Name,
} from './bug-bar.styles';
import { Bug } from '../../models/bug';

type Props = {
  bug: Bug;
};

const BugBar: FC<Props> = ({ bug }) => {
  return (
    <Wrapper>
      <ID>{bug.id}</ID> <Name>{bug.name}</Name>
      <PriorityWrapper>{bug.priority}</PriorityWrapper>
      <Assigned>todo</Assigned>
      <StatusWrapper>{bug.status}</StatusWrapper>
    </Wrapper>
  );
};

export default BugBar;
