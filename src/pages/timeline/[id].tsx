import React from "react";
import Timeline from "../../components/timeline";
import http from "../../http";
import { useRouter } from "next/router";

const TimelinePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Timeline id={id} />
    </div>
  );
};
export default TimelinePage;
