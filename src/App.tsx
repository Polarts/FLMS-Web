import { DockLayout, LayoutData, TabGroup } from 'rc-dock';
import { useContext, useEffect, useRef } from 'react';
import ThreeView from './components/three/ThreeView';
import FileEntityList from './components/ui/FileEntityList';
import PropertyEditor from './components/ui/PropertyEditor';
import TopBar from './components/ui/TopBar';
import { LayoutContext } from './data/context/LayoutContext';

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

  const { layout, setLayout } = useContext(LayoutContext);

  const dockRef = useRef<DockLayout>(null);

  useEffect(() => {
    if (layout && dockRef.current) {
      dockRef.current.loadLayout(layout);
    }
  }, [dockRef, layout]);

  return (
    <div className="app">
      <TopBar/>
      <DockLayout 
        ref={dockRef} 
        onLayoutChange={setLayout} 
        defaultLayout={defaultLayout} 
        groups={groups}
      />
    </div>
  );
}

export default App;
