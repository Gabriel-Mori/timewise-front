import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Base from "../../components/Base";
import { useRouter } from "next/router";

import TimeSheetList from "../../components/timesheet/timeSheet-list";

const ListPage: NextPage = () => {
  const router = useRouter();

  return (
    <Base>
      <div className="mt-8">
        <label className="text-3xl mt-5 mb-5">Listagem de lançamentos</label>
        <TimeSheetList />
      </div>
    </Base>
  );
};

export default ListPage;
