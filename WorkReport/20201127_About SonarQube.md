## Start SonarQube ( For mac )

### 0. Download JDK, and setting path

### 1. Download SonarQube Server
1. Download SonarQube: https://www.sonarqube.org/downloads/
2. Unzip downloaded file.
3. Move downloaded file under /Applications/ folder.
4. Rename it to SonarQube and delete version suffix.

### 2. Download and Setting up SonarScanner
1. Download SonarScanner: https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner
2. Unzip downloaded file.
3. Move downloaded file under /Applications/ folder.
4. Rename it to SonarScanner and delete version suffix.

### 3. Updating .bash_profile with new path
1. Start Terminal and run following command.
$ cd ~/
$ vi .bash_profile, add
```
# Sonar Setting
export PATH=$PATH:/Applications/SonarScanner/bin
export PATH=$PATH:/Applications/SonarQube/bin
```

### 4. Start SonarQube
1. Run following command to start SonarQube server.
```
sh /Applications/SonarQube/bin/macosx-universal-64/sonar.sh console
```

You should see this logs,
```
Running SonarQube…
wrapper | → Wrapper Started as Console
wrapper | Launching a JVM…
jvm 1 | Wrapper (Version 3.2.3) http://wrapper.tanukisoftware.org
jvm 1 | Copyright 1999–2006 Tanuki Software, Inc. All Rights Reserved.
jvm 1 |
jvm 1 | 2019.03.12 11:49:46 INFO app[][o.s.a.AppFileSystem] Cleaning or creating temp directory /Applications/SonarQube/temp
jvm 1 | 2019.03.12 11:49:46 INFO app[][o.s.a.es.EsSettings] Elasticsearch listening on /127.0.0.1:9001
jvm 1 | 2019.03.12 11:49:47 INFO app[][o.s.a.p.ProcessLauncherImpl] Launch process[[key=’es’, ipcIndex=1, logFilenamePrefix=es]] from [/Applications/SonarQube/elasticsearch]: /Applications/SonarQube/elasticsearch/bin/elasticsearch -Epath.conf=/Applications/SonarQube/temp/conf/es
jvm 1 | 2019.03.12 11:49:47 INFO app[][o.s.a.SchedulerImpl] Waiting for Elasticsearch to be up and running
jvm 1 | 2019.03.12 11:49:47 INFO app[][o.e.p.PluginsService] no modules loaded
jvm 1 | 2019.03.12 11:49:47 INFO app[][o.e.p.PluginsService] loaded plugin [org.elasticsearch.transport.Netty4Plugin]
jvm 1 | 2019.03.12 11:49:54 INFO app[][o.s.a.SchedulerImpl] Process[es] is up
```

### 5. Logging In
1. Go to browser. Open following URL.
http://localhost:9000/about
2. Click on Log in.
3. Use admin as username, admin as password.

### 6. Execute Sonar-Scanner
In `sonar-project.properties` directory, type
```
$ sonar-scanner
```

### 7. Fix errors!
You can see overall quality gate in your code.

**Reference : https://medium.com/@pranay.urkude/sonarqube-integration-with-ios-b76df8405014**


