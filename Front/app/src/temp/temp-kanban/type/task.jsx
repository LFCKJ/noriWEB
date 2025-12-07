// task.jsx

/**
 * @typedef {'low' | 'medium' | 'high' | 'urgent'} Priority
 */

/**
 * @typedef {'todo' | 'in-progress' | 'review' | 'done'} TaskStatus
 */

/**
 * @typedef {'feature' | 'bug' | 'improvement' | 'documentation'} TaskType
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} [avatar]
 */

/**
 * @typedef {Object} Comment
 * @property {string} id
 * @property {string} taskId
 * @property {string} userId
 * @property {User} user
 * @property {string} content
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} SubTask
 * @property {string} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * @typedef {Object} Attachment
 * @property {string} id
 * @property {string} name
 * @property {string} url
 * @property {number} size
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {Priority} priority
 * @property {TaskStatus} status
 * @property {TaskType} type
 * @property {Date | null | undefined} [dueDate]
 * @property {User | null | undefined} [assignee]
 * @property {User[]} coAssignees
 * @property {string[]} tags
 * @property {string} project
 * @property {SubTask[]} subTasks
 * @property {Attachment[]} attachments
 * @property {{ [key: string]: string }} customFields
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {'assigned' | 'comment' | 'status-change' | 'due-soon' | 'overdue'} NotificationType
 */

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {NotificationType} type
 * @property {string} taskId
 * @property {string} taskTitle
 * @property {string} message
 * @property {boolean} read
 * @property {Date} createdAt
 */

// JS에서는 타입이 런타임에 필요 없어서 export 할 값은 없어도 됨.
// 그래도 나중에 필요하면 enum 비슷하게 쓰려고 아래 상수도 만들어둠.

export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  REVIEW: 'review',
  DONE: 'done',
};

export const TASK_TYPE = {
  FEATURE: 'feature',
  BUG: 'bug',
  IMPROVEMENT: 'improvement',
  DOCUMENTATION: 'documentation',
};
