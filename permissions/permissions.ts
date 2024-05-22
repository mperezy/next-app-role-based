enum Permissions {
  // Home page
  ViewHome = 'home::view',

  // Loader page
  ViewLoader = 'loader::view',

  // Users page
  ViewUsers = 'users::view',
  CreateUsers = 'users::create',
  UpdateUsers = 'users::update',
  DeleteUsers = 'users::delete',
  UpdatePasswordUsers = 'users::update_password',
  AssignAdminUsers = 'users::can_assign_admin',

  // Moderator page
  ViewModeratorPage = 'moderator::view',

  // Admin page
  ViewAdminPage = 'admin::view',
}

export const permissionsMap: Record<Role, Permissions[]> = {
  // TODO: A better way to make the next could be have a huge array with all the permissions and filter it based role

  Viewer: [Permissions.ViewHome, Permissions.ViewLoader, Permissions.ViewUsers],
  Moderator: [
    Permissions.ViewHome,
    Permissions.ViewLoader,
    Permissions.ViewUsers,
    Permissions.UpdateUsers,
    Permissions.ViewModeratorPage,
  ],
  Admin: [
    Permissions.ViewHome,
    Permissions.ViewLoader,
    Permissions.ViewUsers,
    Permissions.CreateUsers,
    Permissions.UpdateUsers,
    Permissions.DeleteUsers,
    Permissions.UpdatePasswordUsers,
    Permissions.AssignAdminUsers,
    Permissions.ViewModeratorPage,
    Permissions.ViewAdminPage,
  ],
};

export default Permissions;
