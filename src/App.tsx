import { DockLayout, LayoutBase, LayoutData, TabGroup } from 'rc-dock';
import { useEffect, useRef } from 'react';
import ThreeView from './components/three/ThreeView';
import FileEntityList from './components/ui/FileEntityList';
import PropertyEditor from './components/ui/PropertyEditor';

const groups: {[key:string]: TabGroup} = {
  common: {
    floatable: true,
    maximizable: true
  },
  files: {
    floatable: true,
    maximizable: true
  }
}

const defaultLayout: LayoutData = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        size: 6,
        tabs: [
          {
            id: "3d-view",
            title: "3D View",
            group: 'common',
            content: <ThreeView/>
          }
        ]
      },
      {
        size: 2,
        tabs: [
          {
            id: "file-view",
            title: "file.ini",
            group: 'files',
            content: <FileEntityList/>
          }
        ]
      },
      {
        size: 2,
        tabs: [
          {
            id: "properties-view",
            title: "Properties",
            group: 'common',
            content: <PropertyEditor/>
          }
        ]
      }
    ]
  }
};

function App() {

  const dockRef = useRef<DockLayout>(null);

  useEffect(() => {
    const savedLayoutJSON = localStorage.getItem("layout");
    if (!!savedLayoutJSON) {
      dockRef.current?.loadLayout(JSON.parse(savedLayoutJSON));
    }
  }, [dockRef]);

  function layoutChanged(newLayout: LayoutBase) {
    localStorage.setItem("layout", JSON.stringify(newLayout));
  }

  return (
    <DockLayout 
      ref={dockRef} 
      onLayoutChange={layoutChanged} 
      defaultLayout={defaultLayout} 
      groups={groups}
      style={{position: 'absolute', inset: 10}}
    />
  );
}

export default App;
