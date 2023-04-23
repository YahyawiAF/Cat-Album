import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

import styled from "styled-components";

const LayoutContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </LayoutContainer>
  );
};
export default Layout;
