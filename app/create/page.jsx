import CreateLogo from "./CreateLogo";
import { Suspense } from "react";

const CreatePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateLogo />
    </Suspense>
  );
};

export default CreatePage;
