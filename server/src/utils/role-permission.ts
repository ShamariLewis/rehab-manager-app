import {
  Roles,
  Permissions,
  PermissionType,
  RoleType,
} from "../enums/role.enum";

// Here we setup what default permissions each role has.
export const RolePermissions: Record<RoleType, Array<PermissionType>> = {
  OWNER: [
    Permissions.CREATE_WORKSPACE,
    Permissions.EDIT_WORKSPACE,
    Permissions.DELETE_WORKSPACE,
    Permissions.MANAGE_WORKSPACE_SETTINGS,

    Permissions.ADD_MEMBER,
    Permissions.CHANGE_MEMBER_ROLE,
    Permissions.REMOVE_MEMBER,

    Permissions.CREATE_PROJECT,
    Permissions.EDIT_PROJECT,
    Permissions.DELETE_PROJECT,

    Permissions.CREATE_TASK,
    Permissions.EDIT_TASK,
    Permissions.DELETE_TASK,

    Permissions.CREATE_MILESTONE,
    Permissions.EDIT_MILESTONE,
    Permissions.DELETE_MILESTONE,

    Permissions.CREATE_FINANCE,
    Permissions.EDIT_FINANCE,
    Permissions.DELETE_FINANCE,

    Permissions.CREATE_CONTACT,
    Permissions.EDIT_CONTACT,
    Permissions.DELETE_CONTACT,

    Permissions.VIEW_ONLY,
  ],
  ADMIN: [
    Permissions.ADD_MEMBER,

    Permissions.CREATE_PROJECT,
    Permissions.EDIT_PROJECT,
    Permissions.DELETE_PROJECT,

    Permissions.CREATE_TASK,
    Permissions.EDIT_TASK,
    Permissions.DELETE_TASK,

    Permissions.CREATE_MILESTONE,
    Permissions.EDIT_MILESTONE,
    Permissions.DELETE_MILESTONE,

    Permissions.MANAGE_WORKSPACE_SETTINGS,
    Permissions.VIEW_ONLY,
  ],
  MEMBER: [
    Permissions.VIEW_ONLY,
    Permissions.CREATE_TASK,
    Permissions.EDIT_TASK,
    Permissions.CREATE_MILESTONE,
    Permissions.EDIT_MILESTONE,
  ],
};
