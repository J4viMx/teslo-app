"use client";

import { changeUserRole } from "@/actions";
import { User } from "@/interfaces";

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="border-b bg-gray-200">
        <tr>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-medium text-gray-900"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-medium text-gray-900"
          >
            Nombre completo
          </th>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-medium text-gray-900"
          >
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
              {user.email}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
              {user.name}
            </td>
            <td className="flex items-center whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900">
              <select
                className="w-full p-2 text-sm text-gray-900"
                value={user.role}
                onChange={(e) => changeUserRole(user.id, e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
