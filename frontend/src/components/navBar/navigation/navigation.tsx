import { Routes, Route } from "react-router-dom";
import { Container } from "../layout";
import {
  Changelog,
  Contact,
  External1,
  External2,
  NotFound,
  Home,
} from "../views";

export const Navigation = () => (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route path="changelog" element={<Changelog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="external1" element={<External1 />} />
        <Route path="external2" element={<External2 />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>

);
