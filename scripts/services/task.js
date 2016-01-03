'use strict';

app.factory('Task', function(FURL, $firebase, Auth) {
    var ref = new Firebase(FURL);
    var tasks = $firebase(ref.child('tasks')).$asArray();
    var user = Auth.user;

    var Task = {
        all: tasks,

        getTask: function (taskId) {
            return $firebase(ref.child('tasks').child(taskId));
        },

        createTask: function (task) {
            task.datetime = Firebase.ServerValue.TIMESTAMP;
            return tasks.$add(task)
                .then(function(newTask) {
                    // Create User-Tasks lookup record for POSTER
                    var obj = {
                        taskId: newTask.key(),
                        type: true,
                        title: task.title
                    };

                    return $firebase(ref.child('user_tasks').child(task.poster)).$push(obj);
                });
        },

        createUserTasks: function(taskId) {
            Task.getTask(taskId)
                .$asObject()
                .$loaded()
                .then(function(task) {

                    // Create User-Tasks lookup record for RUNNER
                    var obj = {
                        taskId: taskId,
                        type: false,
                        title: task.title
                    };

                    return $firebase(ref.child('user_tasks').child(task.runner)).$push(obj);
                });
        },

        editTask: function (task) {
            var t = this.getTask(task.$id);
            return t.$update({
                title: task.title,
                school: task.school,
                grade: task.grade,
                governorate: task.governorate,
                wilayat:task.wilayat,
                residential: task.residential,
                description: task.description});
        },

        cancelTask: function (taskId) {
            var t = this.getTask(taskId);
            return t.$update({status: "cancelled"});
        },

        isCreator: function (task) {
            return (user && user.provider && user.uid === task.poster);
        },

        isOpen: function (task) {
            return task.status === "open";
        },
        // ------------------------------------------------------------//

        completeTask: function (taskId) {
          var t = this.getTask(taskId);
          return t.$update({status: "تم التبادل"});
        },

        isAssignee: function(task) {
            return (user && user.provider && user.uid === task.runner);
        },

        isCompleted: function(task) {
            return task.status === "تم التبادل";
        }
};
    return Task;

});