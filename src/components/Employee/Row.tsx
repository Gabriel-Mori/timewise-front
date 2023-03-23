import React from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Tooltip } from "@mui/material";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useRouter } from "next/router";
import moment from "moment";
import { BiTimer } from "react-icons/bi";

interface Props {
  row?: any
  setSelectedItem?: any
  setMessageError: (value: string) => void
}



const Row: React.FC<Props> = ({ row, setMessageError, setSelectedItem }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const edit = (id: any) => {
    router.push(`/collaborator/edit/${id}`);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>
          {
            <div>
              <Tooltip
                title={
                  <div>
                    {row.active ? "ativo" : "inativo"}
                  </div>
                }
                placement="bottom"
                arrow
                enterDelay={400}
                leaveDelay={400}
              >

                <div className={`flex items-center justify-center  text-white ml-1 cursor-pointer w-8 h-8 ${row.active === true ? 'bg-green-600' : 'bg-danger'}  rounded-full`}>
                  <span className=" text-lg">
                    {row.active ? "A" : "I"}
                  </span>
                </div>

              </Tooltip>
            </div>

          }
        </TableCell>
        <TableCell>
          {
            <div className="flex items-center text-gray-500 ">
              <label className="ml-2 cursor-pointer">
                <FiEdit
                  size={22}
                  onClick={() => {
                    edit(row.id);
                  }}
                />
              </label>
            </div>}
        </TableCell>
        <TableCell >
          {
            <div className=" text-gray-500 ">
              <button
                className="cursor-pointer ml-4 hover:text-red-500 duration-200"
                onClick={() => {
                  setMessageError("");
                  setSelectedItem(row)
                }}
              >
                <FiTrash size={22} />
              </button>
            </div>
          }
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Projeto(s)
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Data inicial</TableCell>
                    <TableCell>Data final</TableCell>
                    <TableCell>status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.projects.map((row: any) => (

                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.projectName}
                      </TableCell>
                      <TableCell>{row.startDate ? moment(row.startDate).format("DD/MM/YYYY") : <BiTimer className="ml-5" size={24} />}</TableCell>

                      <TableCell>{row.endDate ? moment(row.endDate).format("DD/MM/YYYY") : <BiTimer className="ml-5" size={24} />}</TableCell>

                      <TableCell>
                        {
                          <div>
                            <Tooltip
                              title={
                                <div>
                                  {row.active ? "ativo" : "inativo"}
                                </div>
                              }
                              placement="bottom"
                              arrow
                              enterDelay={400}
                              leaveDelay={400}
                            >

                              <div className={`flex items-center justify-center  text-white ml-1 cursor-pointer w-8 h-8 ${row.active === true ? 'bg-green-600' : 'bg-danger'}  rounded-full`}>
                                <span className=" text-lg">
                                  {row.active ? "A" : "I"}
                                </span>
                              </div>

                            </Tooltip>
                          </div>

                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default Row;
