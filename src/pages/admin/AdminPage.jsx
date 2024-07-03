import React from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import MinDrawer from './MinDrawer';
import CreateUserPage from './CreateUserPage';
import CreateLabPage from './CreateLabPage';
import HealthForm from './HealthForm';
import DailyTipPage from './window/DailyTipPage';
import ViewDailyTips from './Table/ViewDailyTips';

const AdminPage = () =>  (
        <MinDrawer>
          <Routes>
          <Route path="/dailytips" element={<HealthForm/>}/>
            <Route path="/usercreation" element={<CreateUserPage />} />
            <Route path="/labcreation" element={<CreateLabPage />} />
            <Route path="/tips" element={<ViewDailyTips />} />
            <Route path="*" element={<Navigate to="usercreation" />} />
          </Routes>
        </MinDrawer>

      );



export default AdminPage;
