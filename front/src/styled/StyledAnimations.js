import styled, {keyframes} from "styled-components"
import { headShake } from 'react-animations'
import {Badge} from "@material-ui/core"

const shakeAnimation = keyframes`${headShake}`;
export const StyledShakedBadge = styled(Badge)`
  animation: ${props => props.animated ? `1s ${shakeAnimation}` : null};
`;
