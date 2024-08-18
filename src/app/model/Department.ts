export class Department {
  deptId: number;
  deptName: string;
  deptHeadName: string | null;
  deptHeadEmpId: number;
  createdDate: string;

  constructor(
    deptId: number,
    deptName: string,
    deptHeadName: string | null,
    deptHeadEmpId: number,
    createdDate: string
  ) {
    this.deptId = deptId;
    this.deptName = deptName;
    this.deptHeadName = deptHeadName;
    this.deptHeadEmpId = deptHeadEmpId;
    this.createdDate = createdDate;
  }
}
